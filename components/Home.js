import { Component } from "react"
import { Button, Card, CardGroup, Col, Container, Row } from "react-bootstrap"

export class Home extends Component {
    render(){
        return(
            <Container>
                <br></br>
                    <Row>
                        <Col md={4}>
                        <Card 
                            bg="dark"
                            text="light"
                            style={{ padding:20 }}
                            className="mb-2">
                        <Card.Body>
                            <Card.Title>Standard Methods</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Bracketing methods</Card.Subtitle>
                            <Card.Text>
                            Bracketing methods determine successively smaller intervals (brackets) that contain a root. When the interval is small enough, then a root has been found. They generally use the intermediate value theorem, which asserts that if a continuous function has values of opposite signs at the end points of an interval, then the function has at least one root in the interval. Therefore, they require to start with an interval such that the function takes opposite signs at the end points of the interval. 
                            </Card.Text>
                            <Button variant="light" style={{ margin:20 }} href="/bisection">Bisection</Button>
                            <Button variant="light" style={{ margin:20 }} href="/falseposition">False Position</Button>
                        </Card.Body>
                        </Card>
                        </Col>
                        <Col md={4}>
                        <Card 
                            bg="light"
                            text="dark"
                            style={{ padding:20 }}
                            className="mb-2">
                        
                        <Card.Body>
                            <Card.Title>Standard Methods</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Iterative methods</Card.Subtitle>
                            <Card.Text>
                            Although all root-finding algorithms proceed by iteration, an iterative root-finding method generally uses a specific type of iteration, consisting of defining an auxiliary function, which is applied to the last computed approximations of a root for getting a new approximation. The iteration stops when a fixed point (up to the desired precision) of the auxiliary function is reached, that is when the new computed value is sufficiently close to the preceding ones.
                            </Card.Text>
                            <Button variant="dark" style={{ margin:10 }} href="/onepoint">OnePoint</Button>
                            <Button variant="dark" style={{ margin:10 }} href="/newtonraphson">NewtonRaphson</Button>
                            <Button variant="dark" style={{ margin:10 }} href="/secant">Secant</Button>
                        </Card.Body>
                        </Card>
                        </Col>
                        <Col md={4}>
                        <Card 
                            bg="dark"
                            text="light"
                            style={{ padding:20 }}
                            className="mb-2">
                        <Card.Body>
                            <Card.Title>Interpolation Methods</Card.Title>
                            <Card.Text>
                            Many root-finding processes work by interpolation. This consists in using the last computed approximate values of the root for approximating the function by a polynomial of low degree, which takes the same values at these approximate roots. Then the root of the polynomial is computed and used as a new approximate value of the root of the function, and the process is iterated.
                            </Card.Text>
                            <Button variant="light" style={{ margin:20 }} href="/lagrange">Lagrange</Button>
                            <Button variant="light" style={{ margin:20 }} href="/spline">Spline</Button>
                        </Card.Body>
                        </Card>
                        </Col>
                    </Row>
            </Container>
            
        ) 
    }
}