
import AddPost from "../pages/AddPost/AddPost";
import Home from "../pages/Home/Home";
import Public from "../pages/Public";
const publicRoutes = [
    {
      path: "/",
      component: Home,
      layout: Public,
      sidebar: null,
    },
    {
      path: "/add-post",
      component: AddPost,
      layout: Public,
      sidebar: null,
    },
]
export { publicRoutes };
