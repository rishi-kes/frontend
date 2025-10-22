import { IKContext, IKUpload } from "imagekitio-react";

export default function UploadImage() {
  const publicKey = "public_ajOov5PqT8fYGmUbLknEjk8q2TA=";
  const urlEndpoint = "https://ik.imagekit.io/vi53122hg";
  const authenticationEndpoint = "http://localhost:5000/api/upload/auth";

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>📸 Upload Product Image</h2>
      <IKContext
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticationEndpoint={authenticationEndpoint}
      >
        <IKUpload
          fileName="product.jpg"
          onError={(err) => console.error("❌ Upload Failed", err)}
          onSuccess={(res) => console.log("✅ Uploaded:", res.url)}
        />
      </IKContext>
    </div>
  );
}
