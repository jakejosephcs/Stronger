function Workout() {
  return (
    <div>
      <div>
        <div>
          <h1>Workout Name</h1>
          <button>Finish</button>
        </div>
        <p>Workout notes</p>
      </div>
      <div>
        <div>
          <h2>Exercise Name</h2>
          <button>Delete</button>
        </div>
        <table>
          <tr>
            <th>Set</th>
            <th>Weight</th>
            <th>Reps</th>
            <th></th>
          </tr>
          <tr>
            <td>#1</td>
            <td>135lbs</td>
            <td>5</td>
            <td>/</td>
          </tr>
          <tr>
            <td>#2</td>
            <td>135lbs</td>
            <td>5</td>
            <td>/</td>
          </tr>
        </table>
      </div>
      <div>
        <button>Add an exercise</button>
      </div>
      <div>
        <button>Cancel workout</button>
      </div>
    </div>
  );
}

export default Workout;
