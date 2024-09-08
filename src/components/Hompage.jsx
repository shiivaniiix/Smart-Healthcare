import Footer from './Footer'
import Content from './Navbar/Content'
import Topbar from './Navbar/Topbar'

const Hompage = (props) => {
  return (
    <>
        <Topbar {...props}/>
        <Content />
        <Footer />
    </>

  )
}

export default Hompage