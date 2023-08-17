import React from 'react';

const Newsletter = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between p-4 bg-gray-100 rounded-md shadow-md">
      <div className="md:w-1/2 md:pr-8">
        <h3 className="text-2xl md:text-3xl font-semibold mb-4">Бидете во тек!</h3>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          Сите најнови, намалени и актуелни производи се веќе на страницата и ние ги одбравме за тебе!<br /> 
          Сè што треба да направиш е да се регистрираш за нашиот Newsletter!
        </p>
      </div>
      <div className="md:w-1/2 md:pl-8">
        <form noValidate className="mb-4 md:mb-0">
          <div className="flex items-center">
            <div className="flex-grow mr-2">
              <label htmlFor="email" className="text-sm md:text-base text-gray-700">Твоја е-маил адреса</label>
              <input
                type="text"
                id="email"
                name="email"
                aria-invalid="false"
                title="Внесување на билтен"
                className="w-full p-2 border rounded-md text-gray-800"
                placeholder="Внесете вашата е-маил адреса"
              />
            </div>
            <button
              disabled
              type="submit"
              className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Пријавете се
            </button>
          </div>
        </form>
        <p className="text-xs md:text-sm text-gray-600">
          Со зачленување на дневниот Newsletter, ја прифаќате{' '}
          <a href="/politika-za-privatnost" className="text-blue-600 font-semibold underline">
            Политика за приватност
          </a>
        </p>
      </div>
    </div>
  );
};

export default Newsletter;
