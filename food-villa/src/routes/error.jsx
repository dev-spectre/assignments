import Header from "../components/header";
import { useRouteError } from "react-router-dom";

function Error() {
  const err = useRouteError();

  return (
    <>
      <Header />
      <main className="container mx-auto grid place-items-center pt-10">
        <h1 className="text-7xl font-extrabold">{err.status}</h1>
        <h2 className="text-5xl font-bold">{err.statusText}</h2>
      </main>
    </>
  );
}

export default Error;
