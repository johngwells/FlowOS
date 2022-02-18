import styles from './form.module.css';
import cls from 'classnames';

const StatusDropdown = ({ id, currentStatus, setOpen, handleStatusChange }) => {
  const handleStatus = e => {
    e.preventDefault();
    const statusValue = [...e.target.selectedOptions].map(
      option => option.value
    );
    const value = statusValue.join('');

    handleStatusChange(id, value);

    setOpen(false);
  };

  return (
    <form>
      <select
        value={currentStatus}
        onChange={handleStatus}
        className={cls(styles.input, styles.labelMargin)}
      >
        <option value={currentStatus} disabled={true}>
          Select Status
        </option>
        <option value='New'>New</option>
        <option value='Dev Needed'>Dev Needed</option>
        <option value='In Progress'>In Progress</option>
        <option value='Completed'>Completed</option>
      </select>
    </form>
  );
};

export default StatusDropdown;
