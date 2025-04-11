// import { useEffect, useState } from "react";
// import { useUser } from "../../../app/context/UserContext";

// const TWO_HOURS = 1000 * 60 * 60 * 2;

// export const FoodBonus = () => {
//   const { state, dispatch } = useUser();
//   const [available, setAvailable] = useState(false);

//   useEffect(() => {
//     const lastClick = localStorage.getItem("lastFoodClaim");
//     const now = Date.now();

//     if (!lastClick || now - Number(lastClick) >= TWO_HOURS) {
//       setAvailable(true);
//     }

//     const interval = setInterval(() => {
//       const last = localStorage.getItem("lastFoodClaim");

//       if (!last || Date.now() - Number(last) >= TWO_HOURS) {
//         setAvailable(true);
//       }
//     }, 60000);

//     return () =>clearInterval(interval);
//   }, []);

//   const handleClick = async () => {
//     try {
//       const res = await fetch("/api/user/update", {
//         method: "PUT",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify({
//           address: state.address,
//           food: state.food + 50,
//         }),
//       });

//       if (res.ok) {
//         const updated = await res.json();
//         dispatch({type: "SET_USER", payload: updated});
//         localStorage.setItem("lastFoodClaim", String(Date.now()));
//         setAvailable(false);
//       }
//     } catch (err) {
//       console.error("Ошибка при начислении еды:", err);
//     }
//   };

//   if (!available) return null;

//   return (
//     <div style={{ position: "absolute", bottom: "20px", right: "20px", cursor: "pointer" }} onClick={handleClick}>
//       <img src="/icons/resources/food.png" alt="Забрать еду" width={64} height={64} />
//     </div>
//   );
// }
