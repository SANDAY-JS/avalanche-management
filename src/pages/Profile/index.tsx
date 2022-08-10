import { supabase } from '../../supabaseClient'
import { useState, useEffect } from 'preact/hooks'

type Props = {
  path: string
  session: any
}

function Profile({path, session}: Props) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
    getProfile()
  }, [session])

  const getProfile = async () => {
    try {
      setLoading(true)
      const user: any = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        console.log(error.message)
        throw error
      }

      if (data) {
        console.log('data>>', data)
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error:any) {
      console.log('This is it', error)
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (e: Event) => {
    e.preventDefault()

    try {
      setLoading(true)
      const user: any = supabase.auth.user()

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) {
        throw error
      }
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div aria-live="polite">
        {loading ? (
          'Saving ...'
        ) : (
          <form onSubmit={updateProfile} className="form-widget">
            <div>Email: {session.user.email}</div>
            <div>
              <label htmlFor="username">Name</label>
              <input
                id="username"
                type="text"
                value={username || ''}
                onChange={(e: any) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="website">Website</label>
              <input
                id="website"
                type="url"
                value={website || ''}
                onChange={(e: any) => setWebsite(e.target.value)}
              />
            </div>
            <div>
              <button className="button block primary" disabled={loading}>
                Update profile
              </button>
            </div>
          </form>
        )}
        <button type="button" className="button block" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </>
  )
}

export default Profile