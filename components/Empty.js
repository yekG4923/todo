import React from "react";
import styled from "styled-components";

export default function Empty() {
    return (
        <ComponentContainer>
            <EmptyImage source={require("../assets/images/Screenshot.png")} />
            <EmptyText>Add Task</EmptyText>
        </ComponentContainer>
    );
}

const ComponentContainer = styled.View`
    align-items: center;
    justify-content: center;
    height: 650px;
`;

const EmptyImage = styled.Image`
    width: 350px;
    height: 200px;
`;

const EmptyText = styled.Text`
    color: white;
    font-family: Poppins-Bold;
    margin-top: 30px;
    font-size: 30px;
`;