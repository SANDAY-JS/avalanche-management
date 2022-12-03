type Props = {
    children: JSX.Element;
}

const Layout = ({children}: Props) => {
  return (
    <div className="relative w-full max-w-xl mx-auto">
        {children}
    </div>
  )
}

export default Layout