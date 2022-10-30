import { useState } from "react"
import { Button, Col, Container, Row, Table } from "react-bootstrap";


const Cramer =()=>{

    const print = (arr) =>{
        return(
            <Table className="justify-content-md-center" striped bordered hover variant="dark">
                <tbody >
                    {arr.map((element, index)=>{
                        return  (
                        <tr key={index}>
                            <th >X{index+1} = </th>
                            <td md="auto">{element}</td>
                        </tr>)
                    })}
                </tbody>
            </Table>
        );
    }

    const [input00, set00] = useState(-2);
    const [input01, set01] = useState(3);
    const [input02, set02] = useState(1);
    const [input03, set03] = useState(9);

    const [input10, set10] = useState(3);
    const [input11, set11] = useState(4);
    const [input12, set12] = useState(-5);
    const [input13, set13] = useState(0);

    const [input20, set20] = useState(1);
    const [input21, set21] = useState(-2);
    const [input22, set22] = useState(1);
    const [input23, set23] = useState(-4);
    
    const [html, setHtml] = useState(null);

    const detOfMatrix = (matrix) => {
        var ans = matrix[0][0]*(matrix[1][1]*matrix[2][2] - matrix[2][1]*matrix[1][2])
            - matrix[0][1]*(matrix[1][0]*matrix[2][2] - matrix[1][2]*matrix[2][0])
            + matrix[0][2]*(matrix[1][0]*matrix[2][1] - matrix[1][1]*matrix[2][0]);
        return ans;
    }
    
    const calCramer = (A) => {
        var x = new Array(3);
        // for det(A)
        var d = [[A[0][0], A[0][1], A[0][2]], 
            [A[1][0], A[1][1], A[1][2]], 
            [A[2][0], A[2][1], A[2][2]]];
        // for det(A1)
        var d1 = [[A[0][3], A[0][1], A[0][2]], 
            [A[1][3], A[1][1], A[1][2]], 
            [A[2][3], A[2][1], A[2][2]]];
        // for det(A2)
        var d2 = [[A[0][0], A[0][3], A[0][2]], 
            [A[1][0], A[1][3], A[1][2]], 
            [A[2][0], A[2][3], A[2][2]]];
        // for det(A3)		
        var d3 = [[A[0][0], A[0][1], A[0][3]], 
            [A[1][0], A[1][1], A[1][3]], 
            [A[2][0], A[2][1], A[2][3]]];
    
        var D = detOfMatrix(d);
        var D1 = detOfMatrix(d1);
        var D2 = detOfMatrix(d2);
        var D3 = detOfMatrix(d3);
        
        if (D !== 0)
        {
            x[0] = D1/D;
            x[1] = D2/D;
            x[2] = D3/D;
        }
    
        else
        {
            if (D1 === 0 && D2 === 0 && D3 === 0)
                alert("Infinite");
            else if(D1 !== 0 || D2 !== 0 || D3 !== 0)
                alert("No solution");
        }
        return x
    }
    

    const fill2DimensionsArray = (arr, rows, columns) => {
        for (var i = 0; i < rows; i++) {
            arr.push([0])
            for (var j = 0; j < columns; j++) {
                arr[i][j] = 0;
            }
        }
    }

    const Matrix = [];
    fill2DimensionsArray(Matrix, 3, 4)

    const calculateRoot = () =>{
        var a = [];
        fill2DimensionsArray(a, 3, 4)
        var i,j;
        var s = "";
        for(i = 0; i<3; i++){
            for(j = 0; j<4; j++){
                s = ""+i+j;
                a[i][j] = document.getElementById(s).value;
            }
        }
        var answer = calCramer(a);
        setHtml(print(answer));
    }
    
    return (
            <Container>
                <h1>Cramer's Rule</h1>
                <br></br>
                <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th xs={1}></th>
                        <th xs={6}>x1</th>
                        <th xs={6}>x2</th>
                        <th xs={6}>x3</th>
                        <th xs={6}>b</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td><input size={1} id="00" value={input00} onChange={e =>{set00(e.target.value)}}></input></td>
                            <td><input size={1} id="01" value={input01} onChange={e =>{set01(e.target.value)}}></input></td>
                            <td><input size={1} id="02" value={input02} onChange={e =>{set02(e.target.value)}}></input></td>
                            <td><input size={1} id="03" value={input03} onChange={e =>{set03(e.target.value)}}></input></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td><input size={1}  id="10" value={input10} onChange={e =>{set10(e.target.value)}}></input></td>
                            <td><input size={1}  id="11" value={input11} onChange={e =>{set11(e.target.value)}}></input></td>
                            <td><input size={1}  id="12" value={input12} onChange={e =>{set12(e.target.value)}}></input></td>
                            <td><input size={1}  id="13" value={input13} onChange={e =>{set13(e.target.value)}}></input></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td><input size={1}  id="20" value={input20} onChange={e =>{set20(e.target.value)}}></input></td>
                            <td><input size={1}  id="21" value={input21} onChange={e =>{set21(e.target.value)}}></input></td>
                            <td><input size={1}  id="22" value={input22} onChange={e =>{set22(e.target.value)}}></input></td>
                            <td><input size={1}  id="23" value={input23} onChange={e =>{set23(e.target.value)}}></input></td>
                        </tr>
                    </tbody>
                </Table>  
                <br></br>
                <Container>
                <Row>
                    <Col>
                        <Table striped bordered hover variant="dark">
                            <thead><tr><th colSpan={3}>matrix A</th></tr></thead>
                            <tbody>
                                <tr>
                                    <td>{input00}</td>
                                    <td>{input01}</td>
                                    <td>{input02}</td>
                                </tr>
                                <tr>
                                    <td>{input10}</td>
                                    <td>{input11}</td>
                                    <td>{input12}</td>
                                </tr>
                                <tr>
                                    <td>{input20}</td>
                                    <td>{input21}</td>
                                    <td>{input22}</td>
                                </tr>
                            </tbody>
                        </Table>  
                    </Col>
                    <Col>
                        <Table striped bordered hover variant="dark">
                            <thead><tr><th colSpan={3}>matrix B</th></tr></thead>
                            <tbody>
                                <tr>
                                    <td>{input03}</td>
                                </tr>
                                <tr>
                                    <td>{input13}</td>
                                </tr>
                                <tr>
                                    <td>{input23}</td>
                                </tr>
                            </tbody>
                        </Table> 
                    </Col>
                </Row>
                </Container>
                <Button variant="dark" onClick={calculateRoot}>
                    Calculate
                </Button>
                <Container>
                <br></br> 
                {html}
                </Container>
                </Container>
            </Container> 
    )
}

export default Cramer





