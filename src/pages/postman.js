import React, { useEffect } from 'react';
import { Redirect } from '@docusaurus/router';

export default function PostmanRedirect() {
  return <Redirect to="/docs/downloads/postman" />;
}