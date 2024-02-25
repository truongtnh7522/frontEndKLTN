import AddInfo from "../pages/AddInfo/AddInfo";
import Home from "../pages/Home/Home";
import Public from "../pages/Public";
import VerifyCode from "../pages/VerifyCode/VerifyCode";
const publicRoutes = [
    {
      path: "/",
      component: Home,
      layout: Public,
      sidebar: null,
    },
    {
      path: "/add-info",
      component: AddInfo,
      layout: Public,
      sidebar: null,
    },
    // {
    //   path: "/verify",
    //   component: VerifyCode,
    //   layout: Public,
    //   sidebar: null,
    // },
]
export { publicRoutes };
