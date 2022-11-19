import { matrix } from "mathjs";
import { useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";


const Gauss = () => {
    const [Matrix, setMatrix] = useState([]);
    const [N, setN] = useState(0);
    const [Ans, setAns] = useState([]);

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

    const calculateRoot = () =>{
        var a = [];
        fill2DimensionsArray(a, N, N);
        var b = new Array(N);
        for(var i = 0; i<N; i++){
            for(var j = 0; j<N; j++){
                a[i][j] = parseFloat(document.getElementById(""+i+j).value);
            }
            b[i] = parseFloat(document.getElementById(""+i+N).value);
        }
        setAns(solve(a,b));
    }

    return(
        <Container className="mb-4">
            <h1>Gauss</h1>
            <Form>
            <Row className="mb-4">
                    <Col>
                    <h4>N x N</h4>
                    <input type="number" id="N" value={N} onChange={
                      e => {
                        setN(parseInt(e.target.value));
                        setMatrix(new Array(parseInt(e.target.value)).fill(new Array(parseInt(e.target.value)+1).fill(0)));
                      }
                      } className="form-control"></input>
                    </Col>
            </Row>
            </Form>
            
                <Container>
                  <Table bordered hover variant="light">
                    <tbody>
                    {Matrix.map((element,index)=>{
                          var i = index;
                          return(
                              <tr key={i}>
                              {Matrix[index].map((e,index)=>{
                                return(
                                  <td key={""+i+index}>
                                  <h5>{i}{index}</h5>
                                  <input id={""+i+index}/>
                                  </td>)})}
                              </tr>)}
                    )}
                    </tbody>
                  </Table>
                </Container>
                <Button className="mb-4" variant="light" onClick={calculateRoot}>
                    Calculate
                </Button>
                <br></br>
                <h1>Ans =</h1>
                <Table striped bordered hover variant="light">
                    <tbody>
                    <tr>
                    {Ans.map((element,index)=>{
                        return(
                            <td key={index}>X{index+1} = {element}</td>
                        )
                    })}
                    </tr>
                    </tbody>
                </Table>
        </Container>
    )
}

export default Gauss