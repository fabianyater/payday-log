import styles from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  text: string;
  id: string;
  fullwidth: boolean;
}

const Input: React.FC<InputProps> = ({ text, id, fullwidth, ...props }) => {
  return (
    <div className={styles.groupInput} data-full={fullwidth}>
      <label htmlFor={id}>{text}</label>
      <input id={id} {...props} />
    </div>
  );
};

export default Input;
