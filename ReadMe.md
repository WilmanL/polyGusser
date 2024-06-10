## version requirements

- python --version = 3.10.11
- pip --version = 23.0.1
- node --version = 18.16.1
- npm --version = 9.8.0

- ![image](https://github.com/satiwari26/polyGusser/assets/122580195/7504c964-ab11-469b-9b61-f660ce50404f)
![image](https://github.com/satiwari26/polyGusser/assets/122580195/a797fd9a-7be6-4d3e-abd4-758fd3d050d5)

Project Blurb
This project is an interactive website called "PolyGuesser". It's a game platform that mimics the The New York Times "Wordle" game, with an added user profile management system. This website allows users to login/register, saving their profiles, game profiles, and statistics. On the front end, React components are used to create websites interface and user profiles. The backend is powered by Flask, which handles user authentication, game logic, and database interactions on MongoDB. The website includes dyanmic data fetching to ensure that each user has a unique experience. 

Figma UI Prototype:
https://www.figma.com/design/G2SRlEUOWwc67N37Bm5WjW/CSC-307-TE2?node-id=0-1
Last Updated: 5/10/2024

Developement Enviroment setup:
1. cd into the backend folder
2. Create/activate python3.10 virtual env (this can be made using python3.10 -m venv "name of virtual env") this can be activated   with ./"name of virtual env"/Script/activate
3. Activate mongod
4. Install all the required dependencies in the requirements.txt file (this can be done using pip install -r requirements.txt)
5. Run all the schema files on the backend 
6. Run dataBase.py
7. Run the Python files in the routes and miscScript directories
8. Run index.py on the backend 
9. In the frontend:
10. cd frontend
11. npm start
