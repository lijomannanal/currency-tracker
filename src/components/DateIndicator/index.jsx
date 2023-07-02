
import React, { memo} from "react";
import { Label } from "./styles";

const DateIndicator  = ({ date }) => {
 return (
    <Label data-testid="date-indicator"> Rates as of {date}</Label>
 )
};

export default memo(DateIndicator);