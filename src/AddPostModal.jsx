import { useContext, useState } from "react"
import { Button, Col, Form, Row, Image, Modal } from "react-bootstrap"
import { ProfileContext } from "../App"

export default function AddPostModal({ show, handleClose }) {
    const { image, name } = useContext(ProfileContext)

    const [imageUrl, setImageUrl] = useState("")
    const [description, setdescription] = useState("")
    const [invalidUrl, setInvalidUrl] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (imageUrl) {
            setImageUrl("")
            setdescription("")
            handleClose()
        } else {
            setInvalidUrl(true)
        }
    }

    const handleImageError = () => {
        setInvalidUrl(true)
    }

    const handleImageLoad = () => {
        setInvalidUrl(false)
    }

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header>
                <Modal.Title>Share a Post</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Row>
                        <Col sm={7} style={{ margin: `0px` }}>
                            <Image src={imageUrl ? imageUrl : "https:sig1.co/img-placeholder-1"}
                                alt="uploaded content"
                                onError={handleImageError}
                                onLoad={handleImageLoad}
                                style={{ width: "100%" }}
                            />
                        </Col>
                        <Col sm={5} >
                            <Image src={image}
                                alt="uploader"
                                style={{ width: "32px" }}
                                roundedCircle
                            />
                            <span className="ms-3">{name}</span>
                            <Form.Control
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                className="my-3"
                                placeholder="Add image url"
                            />
                            {invalidUrl && (
                                <div className="text-danger">Invalid URL or failed to load image</div>
                            )}
                            <Form.Control
                                value={description}
                                onChange={(e) => setdescription(e.target.value)}
                                className="my-3"
                                as="textarea"
                                rows={3}
                                placeholder="Write a caption..."
                            />

                            <Button type="submit" style={{ width: "100%" }}>
                                Share
                            </Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Form>
        </Modal>
    )
}
