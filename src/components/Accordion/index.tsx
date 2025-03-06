import { Accordion as MuiAccordion } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface IProps {
  title: string;
}
const Accordion: React.FC<IProps> = ({ title }) => {
  return (
    <MuiAccordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <h3>{title}</h3>
      </AccordionSummary>
      <AccordionDetails>
        <p>Details for Accordion 1</p>
      </AccordionDetails>
    </MuiAccordion>
  );
};

export default Accordion;
