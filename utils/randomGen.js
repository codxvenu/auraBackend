
const randomGen = async (keys) => {
    return keys.map(k=>generateDemoKey(k));
};
   
function generateDemoKey(key="ABCD-ABCD-ABCD") { //ABCD-ABCD-ABCD
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const groups = key.split("-").map(l=>l.length);

  return groups
    .map(len =>
      Array.from({ length: len }, () =>
        chars[Math.floor(Math.random() * chars.length)]
      ).join("")
    )
    .join("-");
}
export default randomGen;