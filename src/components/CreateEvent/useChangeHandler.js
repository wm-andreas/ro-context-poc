const useChangeHandler = (step, handler) => {
  const innerHandler = (event) => {
    const { name, value } = event.target;
    handler(step, name, value);
  };
  return innerHandler;
};
const useFormikChangeHandler = (formik, step, handler) => {
  const innerHandler = (event) => {
    const {name, value} = event.target;
    formik.handleChange(event);
    handler(step, name, value);
  }
  return innerHandler;
}
export {useFormikChangeHandler};
export default useChangeHandler;
