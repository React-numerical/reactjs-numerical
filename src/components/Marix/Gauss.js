import { useState } from "react"
import { Button, Col, Container, Row, Table } from "react-bootstrap";


const Gauss =()=>{
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

    const diagonalize = (M) => {
        var m = M.length;
        var n = M[0].length;
        for(var k=0; k<Math.min(m,n); ++k) {
          var i_max = findPivot(M, k);
          if (M[i_max, k] === 0)
            throw "matrix is singular";
          swap_rows(M, k, i_max);
          for(var i=k+1; i<m; ++i) {
            var c = M[i][k] / M[k][k];
            for(var j=k+1; j<n; ++j) {
              M[i][j] = M[i][j] - M[k][j] * c;
            }
            M[i][k] = 0;
          }
        }
      }
      
      const findPivot = (M, k) => {
        var i_max = k;
        for(var i=k+1; i<M.length; ++i) {
          if (Math.abs(M[i][k]) > Math.abs(M[i_max][k])) {
            i_max = i;
          }
        }
        return i_max;
      }
      
      const swap_rows = (M, i_max, k) => {
        if (i_max !== k) {
          var temp = M[i_max];
          M[i_max] = M[k];
          M[k] = temp;
        }
      }
      
      const makeM = (a, b) => {
        for(var i=0; i<a.length; ++i) {
          a[i].push(b[i]);
        }
      }
      
      const substitute = (M) => {
        var m = M.length;
        for(var i=m-1; i>=0; --i) {
          var x = M[i][m] / M[i][i];
          for(var j=i-1; j>=0; --j) {
            M[j][m] -= x * M[j][i];
            M[j][i] = 0;
          }
          M[i][m] = x;
          M[i][i] = 1;
        }
      }
      
      const extractX = (M) => {
        var x = [];
        var m = M.length;
        var n = M[0].length;
        for(var i=0; i<m; ++i){
          x.push(M[i][n-1]);
        }
        return x;
      }
      
      const solve = (a, b) => {
        makeM(a,b);
        diagonalize(a);
        substitute(a);
        var x = extractX(a);
        return x;
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
        fill2DimensionsArray(a, 3, 3)
        var b = new Array(3)
        var i,j;
        var s = "";
        for(i = 0; i<3; i++){
            for(j = 0; j<3; j++){
                s = ""+i+j;
                a[i][j] = document.getElementById(s).value;
            }
            s = ""+i+3;
            b[i] = document.getElementById(s).value;
        }
        var answer = solve(a, b)
        setHtml(print(answer));
    }
    
    return (
            <Container>
                <h1>Gauss Elimination</h1>
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

export default Gauss





