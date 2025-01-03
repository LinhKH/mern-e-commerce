import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1='ABOUT' text2='US' />
      </div>
      <div className="flex flex-col my-10 md:flex-row gap-16">
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, delectus? Obcaecati, odio maxime error libero eveniet saepe enim ut natus laudantium sapiente est doloribus quis ab totam in? Id, dolores!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quas quis voluptatum nesciunt aspernatur id provident voluptatem distinctio quidem nulla! Ratione quam autem ullam distinctio amet cum impedit culpa accusamus!</p>
          <b className='text-gray-800'>Our Missing</b>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa similique, tempora maiores ab nostrum illum accusantium atque laudantium velit neque, reiciendis alias officia consequuntur nam expedita unde? Maiores, labore recusandae.</p>

        </div>
      </div>
      <div className="text-4xl py-4">
        <Title text1='WHY' text2='CHOOSE US' />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Lorem ipsum dolor sit amet, consectetur adipisicing elit..</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Lorem ipsum dolor sit amet, consectetur adipisicing elit..</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Lorem ipsum dolor sit amet, consectetur adipisicing elit..</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}

export default About
