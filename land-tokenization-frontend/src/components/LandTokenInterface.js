import React, { useState, useEffect } from 'react';
import { Container, Form, Button, ListGroup, Spinner, Alert } from 'react-bootstrap';
import { initContract, getLandDetails, mintLandToken, verifyLandToken } from '../utils/contract';

const LandTokenInterface = () => {
  const [tokenId, setTokenId] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [size, setSize] = useState('');
  const [tokenURI, setTokenURI] = useState('');
  const [landDetails, setLandDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    initContract();
  }, []);

  const handleMintLandToken = async () => {
    setLoading(true);
    setError('');
    try {
      await mintLandToken(title, location, size, tokenURI);
      alert('Land token minted successfully!');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyLandToken = async () => {
    setLoading(true);
    setError('');
    try {
      await verifyLandToken(tokenId);
      alert('Land token verified successfully!');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchLandDetails = async () => {
    setLoading(true);
    setError('');
    try {
      const details = await getLandDetails(tokenId);
      setLandDetails(details);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1>Land Tokenization Platform</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Size</Form.Label>
          <Form.Control type="text" value={size} onChange={(e) => setSize(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Token URI</Form.Label>
          <Form.Control type="text" value={tokenURI} onChange={(e) => setTokenURI(e.target.value)} />
        </Form.Group>
        <Button onClick={handleMintLandToken} disabled={loading}>
          {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Mint Land Token'}
        </Button>
      </Form>
      <hr />
      <Form>
        <Form.Group>
          <Form.Label>Token ID</Form.Label>
          <Form.Control type="number" value={tokenId} onChange={(e) => setTokenId(e.target.value)} />
        </Form.Group>
        <Button onClick={handleVerifyLandToken} disabled={loading}>
          {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Verify Land Token'}
        </Button>
        <Button onClick={handleFetchLandDetails} disabled={loading}>
          {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Fetch Land Details'}
        </Button>
      </Form>
      <hr />
      <h2>Land Details</h2>
      <ListGroup>
        <ListGroup.Item>Title: {landDetails.title}</ListGroup.Item>
        <ListGroup.Item>Location: {landDetails.location}</ListGroup.Item>
        <ListGroup.Item>Size: {landDetails.size}</ListGroup.Item>
        <ListGroup.Item>Verified: {landDetails.verified ? 'Yes' : 'No'}</ListGroup.Item>
      </ListGroup>
    </Container>
  );
};

export default LandTokenInterface;