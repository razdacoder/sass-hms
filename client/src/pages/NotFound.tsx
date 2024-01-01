import { Button } from "@/components/ui/button";
import { Heading1, Heading3, Paragraph } from "@/components/ui/typography";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-y-3">
        <Heading1 className="text-5xl lg:text-7xl">Oops!</Heading1>
        <Heading3>404 Page not found</Heading3>
        <Paragraph className="w-[400px] text-center">
          The page you are looking for might have been removed had its name
          changed or is temporary unavailable.
        </Paragraph>
        <Button asChild>
          <Link to="/">GO TO HOMEPAGE</Link>
        </Button>
      </div>
    </div>
  );
}
