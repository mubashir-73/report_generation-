import PropTypes from "prop-types";

export default function Footer({ loggedin }) {
  return (
    <footer className="bg-blue-50 text-black text-center py-4 h-[60px] flex items-center justify-center">
      <p className="text-sm">
        {loggedin === "true" ? (
          <>
            For queries, reach us through{" "}
            <a
              href="mailto:forese@svce.ac.in"
              className="font-semibold text-blue-600 hover:underline"
            >
              forese@svce.ac.in
            </a>
          </>
        ) : (
          <>
            Designed & Developed by{" "}
            <span className="font-semibold text-blue-400">FORESE-TECH</span>
          </>
        )}
      </p>
    </footer>
  );
}

Footer.propTypes = {
  loggedin: PropTypes.string.isRequired, // Ensure loggedin is a boolean
};
