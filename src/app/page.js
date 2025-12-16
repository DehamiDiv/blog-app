'use client'
import styles from "./page.module.css";
import Header from "./Components/Header";  // <-- Correct path
import BlogList from "./Components/BlogList";
import Footer from "./Components/Footer";
import { ToastContainer }  from "react-toastify";


export default function Home() {
  return (
    <>
     <ToastContainer theme="dark"/>
      <Header />
      <BlogList />
      <Footer />
      
     

    </>
  );
}
