import styled from 'styled-components';

const RedSpan = styled.span`
  color: red;
  margin-left : 1px;
  margin-right : 2px;
`;
const LvlLabel = ({ children, required = false, className }) =>{
    return <>
        <span className={className}>
            {<>{children}{required ? <RedSpan>*</RedSpan> : ""}</>}
        </span>
    </>
}

export default LvlLabel;