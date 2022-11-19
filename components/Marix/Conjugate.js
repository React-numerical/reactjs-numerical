import { useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";

const Conjugate = () => {
    const [Matrix, setMatrix] = useState([]);
    const [N, setN] = useState(0);
    const [Ans, setAns] = useState([]);

    const error = (R) =>{
        var err = 0;
        for(var i=0; i<N; i++){
            err += R[i]*R[i];
        }
        return Math.sqrt(err);
    }
    
    const lamda = (D, R, A) =>{
        var i, j;
        var DA = new Array(N).fill(0);
        var up = 0;
        var down = 0;
        for(i=0; i<N; i++){
            up += D[i]*R[i];
        }
        for(i=0; i<N; i++){
            for(j=0; j<N; j++){
                DA[i] += A[i][j]*D[j];
            }
            down += DA[i]*D[i];
        }
        return (-up)/down;
    }
    
    const direction = (D, R, A) =>{
        var a = alpha(D, R, A);
        var Dold = D;
        D = new Array(N).fill(0);
        for(var i=0; i<N; i++){
            D[i] = (-R[i])+a*Dold[i];
        }
        return D;
    }
    
    const alpha = (D, R, A) =>{
        var i, j;
        var RA = new Array(N).fill(0);
        var DA = new Array(N).fill(0);
        var up = 0;
        var down = 0;
        for(i=0; i<N; i++){
            for(j=0; j<N; j++){
                RA[i] += A[i][j]*R[j];
            }
            up += RA[i]*D[i];
        }
        for(i=0; i<N; i++){
            for(j=0; j<N; j++){
                DA[i] += A[i][j]*D[j];
            }
            down += DA[i]*D[i];
        }
    
        return up/down;
    }
    
    const residual = (A, B, x) =>{
        var n = N;
        var R = new Array(N).fill(0);
        for(var i=0; i < n; i++){
            for(var j=0; j < n; j++){
                R[i] += A[i][j]*x[j];
            }
            R[i] -= B[i];
        }
        return R;
    }
    
    const calConjugate = (A, B) =>{
        var n = N;
        var i,l;
        var x = new Array(N).fill(0);
        var R = residual(A, B, x);
        var D = new Array(N).fill(0);
        var e = 0.000001
        var iter = 0;
        var obj = {};
        for(i=0; i<n; i++){
            D[i] = -R[i];
        }
        console.log("R("+iter+"):"+R);
        while(error(R)>e){
            iter++;
            l = lamda(D, R, A);
            console.log("lamda:"+l);
            for(i=0; i<n; i++){
                x[i]+= l*D[i];
            }
            console.log("x("+iter+"):"+x);
            R = residual(A, B, x);
            console.log("R("+iter+"):"+R);
            D = direction(D, R, A);
            console.log("D("+iter+"):"+D);
        }
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
        setAns(calConjugate(a,b));
    }

    return(
        <Container className="mb-4">
            <h1>Conjugate</h1>
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
                            {Matrix[index].map((e,index)=>{return(<td key={""+i+index}><h5>{i}{index}</h5><input id={""+i+index}/></td>)})}
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
                </Container>
                <Button className="mb-4" variant="dark" onClick={calculateRoot}>
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

export default Conjugate