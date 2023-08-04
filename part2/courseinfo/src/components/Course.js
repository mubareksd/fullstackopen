const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <b>total of {sum} exercises</b>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const Course = ({ course }) => {
  const { name, parts } = course;

  const total = parts.reduce((acc, cur) => acc + cur.exercises, 0);

  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total sum={total} />
    </div>
  );
};

export default Course;
