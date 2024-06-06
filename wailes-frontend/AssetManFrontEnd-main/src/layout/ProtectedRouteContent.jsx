import React from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import Layout from ".";

export function ProtectedRouteContent({ Component }) {
  return (
    <>
      <Layout>
        <ProtectedRoute Component={Component} />
      </Layout>
    </>
  );
}
