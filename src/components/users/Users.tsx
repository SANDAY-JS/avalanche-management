import { useQuery } from "@apollo/client"
import { useEffect, useState } from "preact/hooks";
import { GET_USERS_QUERY } from "../../queries/getUsers"
import { supabase } from '../../supabaseClient'

function Users() {
  const [session, setSession] = useState<any>(null)
  const { data, loading, error } = useQuery(GET_USERS_QUERY)

  const users = data?.getUsers;


  useEffect(() => {
      setSession(supabase.auth.session())
      console.log(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
        console.log('session has set', session)
      setSession(session)
    })
  }, [])

  if (loading) return <p>Almost there...</p>
  if (error) return <p class="text-red-500">{error.message}</p>
      
  return (
    <div>
        <h2>Users</h2>
        <pre>
            {JSON.stringify(users, null, "  ")}
        </pre>
    </div>
  )
}

export default Users