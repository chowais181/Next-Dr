import { useSelector } from "react-redux";
export default function Home() {
  const { userInfo } = useSelector((state) => state.user);
  // const dispatch = useDispatch();

  return (
    <div>
      <figure>{userInfo?.name}</figure>
      <span>
        Welcome <strong>{userInfo?.name}!</strong> You can view this page
        because you're logged in
      </span>
    </div>
  );
}
