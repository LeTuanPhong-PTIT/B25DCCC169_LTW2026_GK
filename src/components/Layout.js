import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = ({ loading, error }) => (
  <>
    <NavBar />
    <main>
      {loading ? <p>Đang tải...</p> : error ? <p>Không tải được dữ liệu</p> : <Outlet />}
    </main>
  </>
);

export default Layout;
