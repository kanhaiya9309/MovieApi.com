import express from "express";
// import mongoose from "mongoose";
// import Meme from "../Models/memeModel.js";
import cors from "cors" ;
import rateLimit from "express-rate-limit" ;



const routes = express.Router() ;

routes.use(cors({ origin: '*' }));


routes.use(express.static("public"));


const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5 , // limit each IP to 100 requests per windowMs
  message: `<h1>Too many requests from this IP, please try again after a minute.</h1>`,
});


const memeData = [
    { 
      title: "Distracted Boyfriend",
      img: "https://lh3.googleusercontent.com/bip/AAewDPyjpYkqlGcSdVlnm98gTf21SxPnfLTGM8c-JddFjBjTdD2gNAKHwspXw4Ttpw6OOW_VycD2liEVJvloGDbrXrOEs60OQeNNZL9-HsV1zPwfbSQcdB1v4tvMAktfcH3a-kttz8kTaeEibTslusgxS2whN07glNDFVvzfcE1HRwFmRcGL1mIL=w250-h200-p",
      creator: "Antonio de la Torre"
    },
    {
      title: "Success Kid",
      img: "https://lh3.googleusercontent.com/bip/AAewDPxXWdAKc5Us5Ucv5SRa5BDvxxBTPl2G4Nbtsi4YvOsZNf6_wk2Y3jaDyrunJteceWS2aNAplEJAtzt4Zf6AHLjl07iiMpAvHGF7-1uCOq7Y9VqjsqTU5IR0u2Dpz6Z_DW3JgneyiTitdszBrREs=w250-h200-p",
      creator: "Jamie Knight"
    },
    {
      title: "Roll Safe",
      img: "https://lh3.googleusercontent.com/bip/AAewDPwwvFyJIW3WbkV1wOj_6naL0yYb8X3npEtt02jhS4c2D_lMpqSMoDTaDH6ns0BllNs8Nv77sjm4L1gsWDnYnVLQnQpWumZCbulbqRe2-otUcdebUa8VeelZOXQQ62kaDaqbLlQ=w250-h200-p",
      creator: "Kayode Ewumi"
    },
    {
      title: "Woman Yelling at Cat",
      img: "https://lh3.googleusercontent.com/bip/AAewDPyd442SqVEAigHt_q9Ixme90dYQ_UxT19VVr15mOiK73-6l9dPeM7NtE09SkroTPEfOYKwydeIqsjmLft3hhmas7iiG6vCpezTZ62okKmgLy-CsWw2IG0CK95xaBubpmmMWbIz8F7vWkvcIfZ8R=w250-h200-p",
      creator: " Jonathan Goldstein"
    },
    {
      title: "Surprised Pikachu:",
      img: "https://external-preview.redd.it/DMqtiahmGjPLIzt-5RngLkx4CGfKHax_IoKF7Tir2bc.png?width=1080&crop=smart&auto=webp&s=4a5c73c445b7327ae76042204be4262b791fd2e3",
      creator: "Nintendo"
    },
    {
      title: "Doge",
      img: "https://lh3.googleusercontent.com/bip/AAewDPxUMPkCN65vn71gZGGGD2Tr9_3vfQ9f_sX-xtLgj9AdfFIiFODvtZ4epmMwmrQe96nC7PpAIpAvxC__TT_KKrA2ceBEMdcO25AlfzxDukni7ikpK7vO46LBGfb2LLogU1GUFa9bheADZd8znk7ifSYzUgCMeM7hlWtg4SkLZduQS7nbHGlio1SpyhHsR04V2K1690fZQhmtOl2e_UlHLB6orslTC_6rdvDr7twPFPHzYCgFVbuu-oRCRelD7FtVBjXdCAOQ6H6bJgRTQFqJL73s6lFZwg=w250-h200-p",
      creator: "Atsuko Sato"
    },
    {
      title: "Pepe the Frog",
      img: "https://lh3.googleusercontent.com/bip/AAewDPwd7sLemactqSZ6XvrolumiYlpQ4jNDs6D_9dsWxJUJSV8Tpku5B8QEtl2K1zyWL8Pd-QoTpoV8KUOzkXsP2htUoVuSEgW8xvuZQZW7HJyLxP1OG0mfaSZSLKo_RmcZA5NNe0hUiXhHdPTqNSpkU1N88ljexSJxdWfAQYw-WLsfdyQzLg=w250-h200-p",
      creator: "Matt Furie"
    },
    {
      title: "Smug Sheldon",
      img: "https://lh3.googleusercontent.com/bip/AAewDPx0YFSiN20AQJdlEwZonEUUf8SY8hVVfD2HCCey1rAZzOOisQA3W5j3BVFfYdXmVX1gL2_XO1RWFy_IQtwq7N1wzQs=w250-h200-p",
      creator: "CBS"
    },
    {
      title: "Dancing Pallbearers",
      img: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRV46F3VqXDQ1mxBoC1AD8UyhR6vuzqCsuSVxhBIEFTiIUXroaG9LukHS5z7ABR",
      creator: "Unknown"
    },
    {
      title: "Carryminati Yaar:",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFboNKzn9yZCoKO1EEIJ0wXcbJqy4ZsURAGUftcG7ToF19MZrdEWCpxab1-R5K",
      creator: "CarryMinati"
    }
  ];

const topIndianMovies2023 = [
    {
      title: 'Pathaan',
      director: 'Siddharth Anand',
      boxOffice: '₹832 crore (as of Dec 31, 2023)',
      synopsis: 'A high-octane spy thriller starring Shah Rukh Khan, Deepika Padukone, and John Abraham.',
      image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQNLYbX7hmQwtEW8Sb5D7uRi9kKPJA0KdaenGiFvSQND910BT4ut1N_CxaOzh8Y'
    },
    {
      title: 'The Kashmir Files',
      director: 'Vivek Agnihotri',
      boxOffice: '₹340 crore (as of Dec 31, 2023)',
      synopsis: 'A historical drama based on the exodus of Kashmiri Hindus from the Kashmir Valley in the 1990s.',
      image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTjTxibxymSn6dRmfAaEdKdvNd31o6nGBFYB3aMMYsxsDtR7N37fwkU5PB3etlB'
    },
    {
      title: 'RRR',
      director: 'S.S. Rajamouli',
      boxOffice: '₹1150 crore (as of Dec 31, 2023)',
      synopsis: 'A fictional period action drama following two Indian freedom fighters, Komaram Bheem and Alluri Sitarama Raju, pre-independence India.',
      image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTxEUtw3Kp8EYusRzG7irolk4cay4j_UqI35HH9OsxxpzRGQoskQiUS_J5dt32h'
    },
    {
      title: 'Bhool Bhulaiyaa 2',
      director: 'Anees Bazmee',
      boxOffice: '₹260 crore (as of Dec 31, 2023)',
      synopsis: 'A horror comedy remake of the 2007 film of the same name, starring Kartik Aaryan, Kiara Advani, and Tabu.',
      image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRCKKsunEETr8yz-DNpfYuRY-HC0ckWBSaNHY-YmXRwctoSsIaQ2k0Uq69NWXxJ'
    },
    {
      title: 'Vikram',
      director: 'Lokesh Kanagaraj',
      boxOffice: '₹418 crore (as of Dec 31, 2023)',
      synopsis: 'An action thriller with Kamal Haasan playing a cop who sets out to track down a gang of masked murderers.',
      image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSz_7YP2pbFPSNHZ-3pjIcr22BfHYjKDGStlFpJC6xGqe-pqD5frfK018NWVmUp'
    },
    {
      title: 'Jug Jugg Jeeyo',
      director: 'Raj Mehta',
      boxOffice: '₹234 crore (as of Dec 31, 2023)',
      synopsis: 'A family comedy drama starring Kiara Advani, Varun Dhawan, Anil Kapoor, and Neetu Kapoor, exploring themes of marriage and family dynamics.',
      image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQLDvq3BQXFNUnQBb5YmQJ0pMOZUfvE_QBj2htUtpCK0a6e-TJgrR3cebEK4YBY'
    },
    {
      title: 'Gangubai Kathiawadi',
      director: 'Sanjay Leela Bhansali',
      boxOffice: '₹125 crore (as of Dec 31, 2023)',
      synopsis: 'A biographical drama based on the life of Gangubai Kothewal, a powerful brothel madam in Mumbai\'s Kamathipura district.',
      image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRgiCtjWGA3awLAgK9BzM2pfs-8S72gR0v5cUFZMHETje9Ol_zo-68tPYxFOp1u'
    },
    {
      title: 'Drishyam 2',
      director: 'Abhishek Pathak',
      boxOffice: '₹224 crore (as of Dec 31, 2023)',
      synopsis: 'A crime thriller sequel to the 2015 film Drishyam, starring Ajay Devgn, Tabu, and Shriya Saran.',
      image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTLZfrHCXk9Jtl4tXV1yvBGfbGZBpfy8Ed8vzKP2lhoC5R4cSpjxz0SpY4xoVGp'
    },
    {
      title: 'Jhund',
      director: 'Nagraj Manjule',
      boxOffice: '₹60 crore (as of Dec 31, 2023)',
      synopsis: 'A sports drama based on the real-life story of Vijay Barse, a coach who founded a slum soccer team.',
      image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQOIRQVfuX707_L2aWASTY4vW-MnUebMSHLQ4TGqG5vwYFv3u3Fjzv6OeQPWiKZ'
    },
    {
      title: 'Liger',
      director: 'Puri Jagannadh',
      boxOffice: '₹90 crore (as of Dec 31, 2023)',
      synopsis: 'A sports action film starring Vijay Deverakonda and Ananya Panday, about a mixed martial arts fighter.',
      image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQm9y_KN5MfQcInPs63aOQuXOnvjZTaCLYWjYevpa724YNDyV09jGlOrnCCcrzz'
    },
    {
      title: 'Bhediya',
      director: 'Amar Kaushik',
      boxOffice: '₹82 crore (as of Dec 31, 2023)',
      synopsis: 'A horror comedy with Varun Dhawan playing a man who gets bitten by a wolf and starts exhibiting werewolf-like characteristics.',
      image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTx6ZpvcCA9laooyN-eFl_6Z_AVs68R90VGjGcidsV24jweP_dNc8Kzdo0NcqFs'
    },
    {
      title: 'Pathaan',
      director: 'Siddharth Anand',
      boxOffice: '₹832 crore (as of Dec 31, 2023)',
      synopsis: 'A high-octane spy thriller starring Shah Rukh Khan, Deepika Padukone, and John Abraham.',
      image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQNLYbX7hmQwtEW8Sb5D7uRi9kKPJA0KdaenGiFvSQND910BT4ut1N_CxaOzh8Y'
    },
    {
      title: 'The Kashmir Files',
      director: 'Vivek Agnihotri',
      boxOffice: '₹340 crore (as of Dec 31, 2023)',
      synopsis: 'A historical drama based on the exodus of Kashmiri Hindus from the Kashmir Valley in the 1990s.',
      image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTjTxibxymSn6dRmfAaEdKdvNd31o6nGBFYB3aMMYsxsDtR7N37fwkU5PB3etlB'
    },
    {
      title: 'RRR',
      director: 'S.S. Rajamouli',
      boxOffice: '₹1150 crore (as of Dec 31, 2023)',
      synopsis: 'A fictional period action drama following two Indian freedom fighters, Komaram Bheem and Alluri Sitarama Raju, pre-independence India.',
      image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTxEUtw3Kp8EYusRzG7irolk4cay4j_UqI35HH9OsxxpzRGQoskQiUS_J5dt32h'
    },
    {
      title: 'Bhool Bhulaiyaa 2',
      director: 'Anees Bazmee',
      boxOffice: '₹260 crore (as of Dec 31, 2023)',
      synopsis: 'A horror comedy remake of the 2007 film of the same name, starring Kartik Aaryan, Kiara Advani, and Tabu.',
      image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRCKKsunEETr8yz-DNpfYuRY-HC0ckWBSaNHY-YmXRwctoSsIaQ2k0Uq69NWXxJ'
    },
    {
      title: 'Vikram',
      director: 'Lokesh Kanagaraj',
      boxOffice: '₹418 crore (as of Dec 31, 2023)',
      synopsis: 'An action thriller with Kamal Haasan playing a cop who sets out to track down a gang of masked murderers.',
      image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSz_7YP2pbFPSNHZ-3pjIcr22BfHYjKDGStlFpJC6xGqe-pqD5frfK018NWVmUp'
    },
    {
      title: 'Jug Jugg Jeeyo',
      director: 'Raj Mehta',
      boxOffice: '₹234 crore (as of Dec 31, 2023)',
      synopsis: 'A family comedy drama starring Kiara Advani, Varun Dhawan, Anil Kapoor, and Neetu Kapoor, exploring themes of marriage and family dynamics.',
      image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQLDvq3BQXFNUnQBb5YmQJ0pMOZUfvE_QBj2htUtpCK0a6e-TJgrR3cebEK4YBY'
    },
    {
      title: 'Gangubai Kathiawadi',
      director: 'Sanjay Leela Bhansali',
      boxOffice: '₹125 crore (as of Dec 31, 2023)',
      synopsis: 'A biographical drama based on the life of Gangubai Kothewal, a powerful brothel madam in Mumbai\'s Kamathipura district.',
      image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRgiCtjWGA3awLAgK9BzM2pfs-8S72gR0v5cUFZMHETje9Ol_zo-68tPYxFOp1u'
    },
    {
      title: 'Drishyam 2',
      director: 'Abhishek Pathak',
      boxOffice: '₹224 crore (as of Dec 31, 2023)',
      synopsis: 'A crime thriller sequel to the 2015 film Drishyam, starring Ajay Devgn, Tabu, and Shriya Saran.',
      image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTLZfrHCXk9Jtl4tXV1yvBGfbGZBpfy8Ed8vzKP2lhoC5R4cSpjxz0SpY4xoVGp'
    },
    {
      title: 'Jhund',
      director: 'Nagraj Manjule',
      boxOffice: '₹60 crore (as of Dec 31, 2023)',
      synopsis: 'A sports drama based on the real-life story of Vijay Barse, a coach who founded a slum soccer team.',
      image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQOIRQVfuX707_L2aWASTY4vW-MnUebMSHLQ4TGqG5vwYFv3u3Fjzv6OeQPWiKZ'
    },
    {
      title: 'Liger',
      director: 'Puri Jagannadh',
      boxOffice: '₹90 crore (as of Dec 31, 2023)',
      synopsis: 'A sports action film starring Vijay Deverakonda and Ananya Panday, about a mixed martial arts fighter.',
      image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQm9y_KN5MfQcInPs63aOQuXOnvjZTaCLYWjYevpa724YNDyV09jGlOrnCCcrzz'
    },
    {
      title: 'Bhediya',
      director: 'Amar Kaushik',
      boxOffice: '₹82 crore (as of Dec 31, 2023)',
      synopsis: 'A horror comedy with Varun Dhawan playing a man who gets bitten by a wolf and starts exhibiting werewolf-like characteristics.',
      image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTx6ZpvcCA9laooyN-eFl_6Z_AVs68R90VGjGcidsV24jweP_dNc8Kzdo0NcqFs'
    },
    // Add image property for the rest of the movies
  ];

const movies2023 = [
    {
      title: 'Animal (I)',
      genre: ['Action', 'Crime', 'Drama'],
      cast: ['Ranbir Kapoor', 'Rashmika Mandanna', 'Anil Kapoor', 'Bobby Deol'],
      director: 'Sandeep Reddy Vanga',
      boxOfficeCollection: '₹350 crore (estimated)',
      posterImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQmEwZK38tmH5RjrzcR9Lo6_infiuvdEPYAg8_-YsHGg16NjNNc2cRYge91FWj',
    },
    {
      title: '12th Fail',
      genre: ['Biography', 'Drama'],
      cast: ['Vicky Kaushal', 'Yami Gautam', 'Mithun Chakraborty'],
      director: 'Srikanth Bolla',
      boxOfficeCollection: '₹62 crore',
      posterImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSahvlzvVpf5q0gbALBHvy_3Y-cORMObNXEnye5JRMJRAqWCrt5p2WeGwzc3SeN',
    },
    {
      title: 'Jawan',
      genre: ['Action', 'Thriller'],
      cast: ['Shah Rukh Khan', 'Nayanthara', 'Vijay Sethupathi'],
      director: 'Atlee Kumar',
      boxOfficeCollection: '₹500 crore (estimated)',
      posterImageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTRCirDQHKkeo4W7UymqWpAb2mwm4dsi-eXkPTg8aY7tNk87ZUgKLRbhqH196HM',
    },
    {
      title: 'Jaane Jaan',
      genre: ['Crime', 'Drama', 'Mystery'],
      cast: ['R Madhavan', 'Alia Bhatt', 'Vijay Varma'],
      director: 'Homi Adajania',
      boxOfficeCollection: '₹45 crore',
      posterImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7JSsFHpMZcAzxMBDca52cV545LMkk9cmLSF8tz3ohtox1p3BRboylF8-iHDdT',
    },
    {
      title: 'Rocky Aur Rani Ki Prem Kahani',
      genre: ['Romance', 'Musical'],
      cast: ['Ranveer Singh', 'Alia Bhatt', 'Dharmendra', 'Jaya Bachchan', 'Shabana Azmi'],
      director: 'Karan Johar',
      boxOfficeCollection: '₹125 crore',
      posterImageUrl: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTpwnGe6XIKdW3d8NqvZZBXvgsdE6KsQIzJXmUV53cwhC9jf57Kmc2AEkdAlRkB',
    },
    {
      title: 'Mrs. Chatterjee vs Norway',
      genre: ['Drama', 'Thriller'],
      cast: ['Rani Mukerji', 'Jim Sarbh'],
      director: 'Ashim Ahluwalia',
      boxOfficeCollection: '₹70 crore',
      posterImageUrl: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR3AIh5OzTYQf-TcBJuQL-W7uWkkNKx9mbO5FYktMk0MfPN7pXY7nilMtq4_jze',
    },
    {
      title: 'Dunki',
      genre: ['Social Comedy'],
      cast: ['Shah Rukh Khan', 'Taapsee Pannu', 'Boman Irani', 'Vicky Kaushal'],
      director: 'Rajkumar Hirani',
      boxOfficeCollection: '₹200 crore (estimated)',
      posterImageUrl: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRHLDtYFNLbN9eFdYzkQEKwPCkD9EUNrtDmFtQ970Y3gyc7hD18RS2x4KpxE8RS',
    },
    {
      title: 'OMG 2',
      genre: ['Comedy', 'Drama'],
      cast: ['Akshay Kumar', 'Pankaj Tripathi', 'Yami Gautam'],
      director: 'Amit Rai',
      boxOfficeCollection: '₹100 crore',
      posterImageUrl: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ-HZ16AimrKnfCDBM4nATt3ZekhreEDObWa2WB2k31CXmySjC2SbW-7lhFhUK_",
    },
    {
      title: 'Ponniyin Selvan: Part Two',
      genre: ['Historical Drama'],
      cast: ['Vikram', 'Jayam Ravi', 'Karthi', 'Aishwarya Rai Bachchan', 'Trisha Krishnan'],
      director: 'Mani Ratnam',
      boxOfficeCollection: '₹240 crore (estimated)',
      posterImageUrl: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQSYFnAP9tghqbl5FhJQfj2nCyXqD9xw9dr2phfT7KcQVX2dmqIHlKML_HoFF3n',
    },
    {
      title: 'Thunivu',
      genre: ['Action', 'Crime', 'Thriller'],
      cast: ['Ajith Kumar', 'Manju Warrier', 'Samuthirakani'],
      director: 'H. Vinoth',
      boxOfficeCollection: '₹201.9 crore',
      posterImageUrl: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSC2daNJs1I1b4qoOLFRMcuuYPg8qPvXQITmVo9msxgEbYMZwkmErEWSiKzNoy5',
    },
    {
      title: 'Kisi Ka Bhai Kisi Ki Jaan',
      genre: ['Action', 'Comedy', 'Drama'],
      cast: ['Salman Khan', 'Pooja Hegde', 'Shehnaaz Gill', 'Venkatesh', 'Jagapathi Babu'],
      director: 'Farhad Samji',
      boxOfficeCollection: '₹182.5 crore',
      posterImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr47TjOsGgOqexmwrWMpzjM06B5-dwFaqwKa6s6D9lZgaOWF3fMfNLC6pSwLiI',
    },
    {
      title: '2018',
      genre: ['Action', 'Drama', 'Thriller'],
      cast: ['Mohanlal', 'Suraj Venjaramoodu', 'Asif Ali', 'Parvathy Thiruvothu'],
      director: 'Udayananu Arun',
      boxOfficeCollection: '₹180.5 crore',
      posterImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlFWqXRk8J7Fdslmg4Ozb6eKWmGP1TSVQ8Nw5ALF-NjDa1BSa8ON8cIoLE6Asd',
    },
    {
      title: 'Dream Girl 2',
      genre: ['Comedy', 'Drama', 'Romance'],
      cast: ['Ayushmann Khurrana', 'Rakul Preet Singh', 'Paresh Rawal'],
      director: 'Raaj Shaandilyaa',
      boxOfficeCollection: '₹140.2 crore',
      posterImageUrl: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ70uznPjXsGjLg1NdOToe1P8Sl_d3JFBxzwEreMArOeAquJHY4Em7G6Ww3hJuG',
    },
  ];
  


// Meme.insertMany(memeData);

routes.use('/movies', limiter);
routes.use('/MoviesOfYear', limiter);



routes.get('/',(req,res)=>{
  res.send(`<h1>Hello Welcome to Movie Api</h1>`)
   console.log("User access movie api ")
 })
 

routes.get('/movies',(req,res)=>{
    // let randomMeme = Math.floor(Math.random()*topIndianMovies2023.length)
   try{

  const response =  { 
  status: 'success', 
  message: 'Request fulfilled successfully',
  data :  movies2023 
  }
     res.setHeader('Content-Type', 'application/json')
     res.status(200).json(response);
      console.log("Meme is access by Api")
   }catch(error){
     console.log(error)
     res.status(500).json({
      status: 'error',
      message: 'Internal server error',
     });
   }
 })

 routes.get('/MoviesOfYear',(req,res)=>{
  // let randomMeme = Math.floor(Math.random()*topIndianMovies2023.length)
 try{

const response =  { 
status: 'success', 
message: 'Request fulfilled successfully',
data :  topIndianMovies2023 
}  
   res.setHeader('Content-Type', 'application/json')
   res.status(200).json(response);
    console.log("Meme is access by Api")
 }catch(error){
   console.log(error)
   res.status(500).json({
    status: 'error',
    message: 'Internal server error',
   });
 }
})
 
routes.get('/Meme',(req,res)=>{
  try{
   let randomMeme = Math.floor(Math.random() * memeData.length) ;
   res.status(200).json(memeData[randomMeme]);
  }
  catch(error){
    console.log(error)
  }
    
    
 })


export default routes