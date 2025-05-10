import Button from "@/components/atoms/Button";
import ImputText from "@/components/atoms/InputText";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-lightGraySecondary">
      <Button text="Click Me" />
      <ImputText placeholder="Hola Mundo" />
    </div>
  );
}
