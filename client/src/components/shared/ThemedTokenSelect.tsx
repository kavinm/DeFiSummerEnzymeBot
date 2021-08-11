import Select from "react-select";
import styled from "@emotion/styled";

const StyledSelect = styled(Select)`
  & {
    width: 22rem;
    height: 42px;
    background-color: #111827 !important;
    cursor: pointer !important;

    input {
      color: white !important;
    }

    > div:first-of-type {
      background-color: #111827 !important;
      border-color: #4b5563;
      cursor: pointer !important;
      > div:first-of-type {
        background-color: #111827;
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;
        cursor: pointer !important;
        div {
          color: white !important;
        }
      }
      > div:nth-of-type(2) > span {
        display: none;
      }
    }
  }
`;

export default StyledSelect;
