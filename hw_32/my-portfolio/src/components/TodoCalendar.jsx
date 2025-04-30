import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import { styled } from "@mui/material/styles";
import { Box, Tooltip } from "@mui/material";
import { format } from "date-fns";

const formatDate = (date) => (date ? format(date, "yyyy-MM-dd") : null);

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "highlighted",
})(({ theme, highlighted }) => ({
  ...(highlighted && {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.common.white,
    fontWeight: "bold",
    borderRadius: "50%",
    "&:hover": {
      backgroundColor: theme.palette.success.main,
    },
  }),
}));

const TodoCalendar = ({ value, onChange, todosByDate }) => {
  const renderDay = (day, _value, DayComponentProps) => {
    const formatted = formatDate(day);
    const taskCount = todosByDate[formatted] || 0;

    return (
      <Tooltip key={formatted} title={`Задач: ${taskCount}`} placement="top">
        <Box>
          <CustomPickersDay
            {...DayComponentProps}
            highlighted={taskCount > 0}
          />
        </Box>
      </Tooltip>
    );
  };

  return (
    <DateCalendar value={value} onChange={onChange} renderDay={renderDay} />
  );
};

export default TodoCalendar;
