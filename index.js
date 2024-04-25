const { Pool } = require("pg");

const config = {
  user: "postgres",
  host: "localhost",
  password: "geraldine19",
  database: "alwaysmusic",
  port: 5432,
};

const pool = new Pool(config);

const argumentos = process.argv.slice(2);

const funcion = argumentos[0];
const nombre = argumentos[1];
const rutEstudiante = argumentos[2];
const curso = argumentos[3];
const nivel = argumentos[4];

//consulta los estudiantes registrados
const consulta = async () => {
  const res = await pool.query("SELECT * FROM users");
  console.log("Usuarios registrados:", res.rows);
};

//agrega un nuevo estudiante
const nuevo = async ({ nombre, rutEstudiante, curso, nivel }) => {
  const res = await pool.query(
    `INSERT INTO users (nombre,rut,curso,nivel) values ($1,$2,$3,$4)  RETURNING *`,
    [nombre, rutEstudiante, curso, nivel]
  );
  console.log(`Usuario ${nombre} agregado con éxito`);
  console.log("Usuario Agregado: ", res.rows[0]);
};

//consultar estudiante por rut
const rut = async ({ rutEstudiante }) => {
  const res = await pool.query(`SELECT *  FROM users WHERE rut=$1 `, [
    rutEstudiante,
  ]);
  console.log("Usuario consultado por rut: ", res.rows[0]);
};

//editar informacion del estudiante
const editar = async ({ nombre, rutEstudiante, curso, nivel }) => {
  await pool.query(
    `UPDATE users  SET nombre=$1, rut=$2, curso=$3 , nivel=$4 WHERE rut=$2 RETURNING *`,
    [nombre, rutEstudiante, curso, nivel]
  );
  console.log(`Estudiante  ${nombre} editado  con éxito`);
};

//eliminar el registro de un estudiante
const eliminar = async ({ rutEstudiante }) => {
  const res = await pool.query(`DELETE  FROM users WHERE rut=$1 RETURNING * `, [
    rutEstudiante,
  ]);
  console.log("Usuario eliminado: ", res.rows);
};

(async () => {
  // recibir funciones y campos de la linea de comando
  switch (funcion) {
    case "consulta":
      consulta();
      break;
    case "nuevo":
      nuevo({ nombre, rutEstudiante, curso, nivel });
      break;
    case "editar":
      editar({ nombre, rutEstudiante, curso, nivel });
      break;
    case "eliminar":
      eliminar({ rutEstudiante });
      break;
    case "rut":
      rut({ rutEstudiante });
      break;
    default:
      console.log("Funcion: " + funcion + "no es valida");
      break;
  }

  pool.end();
})();
