import { useState } from 'preact/hooks'
import { supabase } from '../supabaseClient'

type Props = {
    path?: string;
}

export default function Auth({}: Props) {
  const [loading, setLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')

  const handleLogin = async (e: Event) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error: any) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget" aria-live="polite">
        <h1 className="header">AVALANCHEログイン</h1>
        <p className="description">メールアドレスでサインイン</p>
        {loading ? (
          '送信中'
        ) : (
          <form onSubmit={handleLogin}>
            <label htmlFor="email">メールアドレス</label>
            <input
              id="email"
              className="inputField"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e:any) => setEmail(e.target.value)}
            />
            <button className="button block" aria-live="polite">
              送信
            </button>
          </form>
        )}
      </div>
    </div>
  )
}