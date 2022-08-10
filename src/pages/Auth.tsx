import { useState } from 'preact/hooks'
import { supabase } from '../supabaseClient'

type Props = {
    path?: string;
}

export default function Auth({}: Props) {
  const [loading, setLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [success, setSuccess] = useState<string>('')

  const handleLogin = async (e: Event) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      setSuccess('メールアドレスにログイン用URLを送信しました。')
    } catch (error: any) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row flex flex-center w-full py-8 px-2">
      <div className="flex flex-col items-center gap-4 w-full" aria-live="polite">
        <h1 className="text-xl font-bold italic">ログイン</h1>
        {loading ? (
          '送信中'
        ) : (
          !success ? 
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
              <button className="block w-full text-center" aria-live="polite">
                送信
              </button>
            </form> : 
          <p class='text-green-500 text-xl text-center w-4/5 mx-auto'>{success}</p>
        )}
      </div>
    </div>
  )
}