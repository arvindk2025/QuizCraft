import { useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { apiConnector } from "../services/apiConnector"
import { quizEndpoints } from "../services/APIs/index"
import QuizCard from '../components/core/Home/QuizCard'
import PaginationControls from './PaginationControls';
import axios from 'axios'

const Home = () => {

  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    totalCount: 0,
  })
  const { token } = useSelector(state => state.auth)

  // const fetchQuizzes = async (page = 1) => {
  //   setLoading(true);
  //   try {
  //     const response = await apiConnector("GET", quizEndpoints.GET_ALL_QUIZES, {
  //       page,
  //       limit:6,
  //     }, {
  //       Authorization: `Bearer ${token}`,
  //     });
  //     console.log("page :",page );
  //     console.log("pagination :",pagination );
      
  //     const { data, pagination: newPagination } = response.data;
  //     setQuizzes(data);
  //     setPagination(newPagination);
  //   } catch (error) {
  //     console.log("COULDNT GET QUIZZES");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

// const fetchQuizzes = async (page = 1) => {
//   setLoading(true);
//   try {
//     console.log("token : " , token);
//     const response = await axios.get(
//       'http://localhost:3000/api/v1/quizzes',
//       {
//         page,
//         limit: 6,  // Sending page and limit in the body
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,  // Including authorization header
//         },
//       }
//     );

//     console.log("page :", page);
//     console.log("pagination :", pagination);

//     const { data, pagination: newPagination } = response.data;
//     setQuizzes(data);
//     setPagination(newPagination);
//   } catch (error) {
//     console.log("COULDNT GET QUIZZES", error);
//   } finally {
//     setLoading(false);
//   }
// };

const BASE_URL = import.meta.env.VITE_BASE_URL;
const fetchQuizzes = async (page = 1) => {
  setLoading(true);
  try {
    console.log("token: ", token);
    
    const response = await axios.get(`${BASE_URL}/quizzes`, {
      params: {  // Send `page` and `limit` as query parameters
        page,
        limit: 6,
      },
      headers: {
        Authorization: `Bearer ${token}`,  // Pass the Authorization header
      },
    });

    console.log("page: ", page);
    console.log("pagination: ", pagination);

    const { data, pagination: newPagination } = response.data;
    setQuizzes(data);
    setPagination(newPagination);
  } catch (error) {
    console.log("COULDNT GET QUIZZES", error);
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
    fetchQuizzes();
  }, [])

  const handlePageChange = (newPage) => {
    setPagination((prevPagination) => ({ ...prevPagination, page: newPage }));
    fetchQuizzes(newPage);
  };

  return (
    <section className='min-h-[90vh] border-t border-slate-600 py-5 mt-3'>
      {
        loading ? <div className='text-center min-h-[90vh] flex items-center justify-center text-xl'>Loading...</div>
          : !loading && quizzes?.length > 0
            ? <div className='grid grid-cols-1 md:grid-cols-2 gap-7 lg:grid-cols-3'>
              {
                quizzes.map((quiz, index) => (
                  <QuizCard key={quiz._id} quiz={quiz} index={index} />
                ))
              }
              <PaginationControls
                pagination={pagination}
                onPageChange={(newPage) => handlePageChange(newPage)}
              />
            </div>
            : <p>No More Quiz</p>
      }
    </section>
  )
}

export default Home