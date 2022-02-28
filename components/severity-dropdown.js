import styles from './dropdown.module.css';
import cls from 'classnames';

const SeverityDropdown = ({
  id,
  currentStatus,
  setSeverityOpen,
  handleSeverityChange
}) => {
  const handleStatus = e => {
    const statusValue = [...e.target.selectedOptions].map(
      option => option.value
    );
    const value = statusValue.join('');

    handleSeverityChange(id, value);

    setSeverityOpen(false);
  };

  return (
    <form>
      <select
        value={currentStatus}
        onChange={handleStatus}
        className={cls(styles.input, styles.labelMargin)}
      >
        <option value={currentStatus} disabled={true}>
          Select Severity
        </option>
        <option value='Low'>Low</option>
        <option value='Mid'>Mid</option>
        <option value='High'>High</option>
        <option value='Critical'>Critical</option>
      </select>
    </form>
  );
};

export default SeverityDropdown;
