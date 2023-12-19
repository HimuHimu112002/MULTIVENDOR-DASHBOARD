import React, { useState } from 'react';
import { Button, message, Steps, theme } from 'antd';

const steps = [
  {
    title: 'Planning',
    content: `ব্যবস্থাপনার যে কাজ উদ্দেশ্যসমূহ প্রতিষ্ঠা করে এবং সেগুলো অর্জন করার জন্য পরিকল্পনা তৈরী করে তাকে Planning বা পরিকল্পনা বলে। Definition (2): ব্যবস্থাপনার মৌলিক কাজ যা বিদ্যমান সম্পদের সাহায্যে প্রয়োজন বা চাহিদার সর্বোৎকৃষ্ট ভারসাম্য অর্জনের জন্য এক বা একাধিক বিস্তারিত পরিকল্পনা করে তাকে প্ল্যানিং বলা হয়।`,
  },
  {
    title: 'Target',
    content: `Target Marketing বা লক্ষ্য বিপণন হলো একটি বাজারকে অংশে বিভক্ত করা এবং তারপরে আপনার বিপণনের প্রচেষ্টাগুলিকে এক বা কয়েকটি মূল অংশে কেন্দ্রীভূত করা যেগুলোর গ্রাহকদের চাহিদা এবং আকাঙ্ক্ষাগুলি আপনার পণ্য বা সেবার অফারগুলির সাথে সবচেয়ে ভালোভাবে মিলে যায়। এটি নতুন ব্যবসা আকৃষ্ট করা, বিক্রয় বৃদ্ধি এবং আপনার ব্যবসাকে সফল করার মূল চাবিকাঠি হতে পারে।`,
  },
  {
    title: 'Business',
    content: `একটি ব্যবসার তিনটি মূল বৈশিষ্ট্য আছে। প্রথমতঃ ব্যবসাকে অবশ্যই এক বা একাধিক মানুষের সংগঠিত কাজের ফলাফল হতে হবে। দ্বিতীয়তঃ ব্যবসাকে অবশ্যই একটি সামাজিক চাহিদা মেটাতে হবে। তৃতীয়তঃ ব্যবসাকে অবশ্যই একটা মুনাফা অর্জন করতে হবে। যেমন: একটি মুদীর দোকান এক বা একাধিক মানুষের সমষ্টিগত কাজের ফলাফল। এটা আমাদের এবং আমাদের পরিবারের খাবার এবং নিত্য প্রয়োজনীয় দ্রব্যাদি কেনার সামাজিক চাহিদা পূরণ করে এবং কিছু পরিমাণ মুনাফা অর্জন করে।`,
  },
];

const Discription = () => {

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  
  const contentStyle = {
    padding: '50px',
    fontSize: "25px",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

return (
  <>

  <h1>You Read To Know About This Business</h1>
  <Steps current={current} items={items} />
    <div style={contentStyle}>{steps[current].content}</div>
    <div style={{marginTop: 24}}>

      {current < steps.length - 1 && (
      <Button type="primary" onClick={() => next()}>
          Next
      </Button>
      )}

      {current === steps.length - 1 && (
      <Button type="primary" onClick={() => message.success('Processing complete!')}>
          Done
      </Button>
      )}

      {current > 0 && (
      <Button
          style={{
          margin: '0 8px',
          }}
          onClick={() => prev()}
      >
          Previous
      </Button>
      )}
    </div>
  </>
  
)
}
export default Discription