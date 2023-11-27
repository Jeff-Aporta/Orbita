function URL_LOGO(w) {
  return `https://docs.google.com/drawings/d/e/2PACX-1vQTeXdTiQcpfjac3wJnJqfeTwsIz9OplbwQ2k8NedcTk1OHZioJ4wYdZiU0bg6OaYezDdM1_NTF7T7l/pub?w=${w}&h=${w}`;
}

function Logo({ className, w }) {
  return (
    <img src="/img/svg/SIPUC-LOGO.svg" className={className} width={w} height={w} />
  );
}