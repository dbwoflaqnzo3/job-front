'use client'
import { Button1, Button2, Button3, Button4, Button5, Button6 } from "../components/ui/buttons/Regular";

export default function Home() {
  return (
    <div>
      <h1>집임</h1>
      <p>뭐요</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "20px" }}>
        <Button1 text="1 Default" />
        <Button1 text="1 Disabled" disabled />
        <Button2 text="2 Default" />
        <Button2 text="2 Disabled" disabled />
        <Button3 text="3 Default" />
        <Button3 text="3 Disabled" disabled />
        <Button4 text="4 Default" />
        <Button4 text="4 Disabled" disabled />
        <Button5 text="5 Default" />
        <Button5 text="5 Disabled" disabled />
        <Button6 text="6 Default" />
        <Button6 text="6 Disabled" disabled />
      </div>
    </div>
  );
}
