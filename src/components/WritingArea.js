// This component holds the writing area function which provides a textarea to render onto the page

function WritingArea() {
  return(
    <form action="">
      <label id="writingArea" htmlFor="writingArea"></label>
      <textarea name="writingArea" id="writingArea" placeholder="Set a time goal and start writing"></textarea>
      {/* add author name in to support our stretch goal of saving writing entries to the database */}
    </form>
  )
}

export default WritingArea;