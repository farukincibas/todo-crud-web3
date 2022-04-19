import loaderStyles from "../../styles/Loader.module.css";

const Loader = (props) => {
  return <>{props.loader ? <div className={loaderStyles.divLoader}></div> : <div></div>}</>;
};

export default Loader;
