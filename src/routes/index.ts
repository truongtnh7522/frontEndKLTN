import Home from "../pages/Home/Home";
import Public from "../pages/Public";
const publicRoutes = [
    {
      path: "/",
      component: Home,
      layout: Public,
      sidebar: null,
    },
]
export { publicRoutes };
