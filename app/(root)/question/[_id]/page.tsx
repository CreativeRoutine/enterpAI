import { getQuestion } from "@/lib/actions/question.action";
import React from "react";

const QuestionDetails = async ({ params }: RouteParams) => {
  const { _id } = await params;

  const question = await getQuestion({ questionId: _id });

  console.log("Вот такой вот вопросик", question);

  return (
    <>
      {question ? (
        <>
          <div>
            <div>
              Translation for <span>{question?.data?.sourceText}</span>
            </div>
            <div>
              {question?.data?.translations.map((item, index) => (
                <div key={index} className="mb-4">
                  <p>
                    <strong>Text:</strong> {item.text}
                  </p>
                  <p>
                    <strong>IPA:</strong> {item.ipa}
                  </p>
                  <p>
                    <strong>Meaning:</strong> {item.meaning}
                  </p>
                  {item.note && (
                    <p>
                      <strong>Note:</strong> {item.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div>Spinner</div>
      )}
    </>
  );
};

export default QuestionDetails;
