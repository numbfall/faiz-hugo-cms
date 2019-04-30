import React from "react";
import Jumbotron from "./components/jumbotron";

export default class PostPreview extends React.Component {
  render() {
    const {entry, getAsset} = this.props;
    let image = getAsset(entry.getIn(["data", "image"]));

    // Bit of a nasty hack to make relative paths work as expected as a background image here
    if (image && !image.fileObj) {
      image = window.parent.location.protocol + "//" + window.parent.location.host + image;
    }

    return <div>
      <Jumbotron image={image} title={entry.getIn(["data", "title"])} />

      <div className="bg-off-white pv4">
        <div className="ph3 mw7 center">
          <h2 className="f2 b lh-title mb2">{entry.getIn(["data", "intro", "heading"])}</h2>
          <p className="mb4 mw6">{entry.getIn(["data", "intro", "description"])}</p>

          <div className="flex-ns flex-wrap mhn2-ns mb3">
            {(entry.getIn(["data", "intro", "blurbs"]) || []).map((blurb, index) => <div className="ph2-ns w-50-ns mb4" key={index}>
              <img src={blurb.get("image") && getAsset(blurb.get("image"))} alt="" className="center db mb3" style={{width: "240px"}}/>
              <p>{blurb.get("text")}</p>
            </div>)}
          </div>
        </div>
      </div>

      <div className="tc mb4">
        <a href="/pdf/faizeaam-booklet.pdf" rel="noopener noreferrer" target="_blank" className="btn raise">Download our booklet</a>
      </div>

      <div className="mw7 center">
        <div className="mw6 ph3 mb3">
          <h3 className="f3 b lh-title mb2">{entry.getIn(["data", "main", "heading"])}</h3>
          <p>{entry.getIn(["data", "main", "description"])}</p>
        </div>
      </div>

      <div className="mw7 center ph3 pv4">

        <div className="flex flex-wrap mhn1">
          <div className="w-100 w-50-ns ph1-ns">
            <img src={getAsset(entry.getIn(["data", "main", "image1", "image"]))}/>
          </div>

          <div className="w-100 w-50-ns ph1-ns">
            <img src={getAsset(entry.getIn(["data", "main", "image2", "image"]))}/>
          </div>

          <div className="w-100 ph1-ns">
            <img src={getAsset(entry.getIn(["data", "main", "image3", "image"]))}/>
          </div>
        </div>
      </div>

      <div className="tc mb4">
        <a href="https://www.facebook.com/Mount-HIRA-Street-Children-School-372062566191109/" rel="noopener noreferrer" target="_blank" className="btn raise btn-blue">Find us on facebook</a>
      </div>

      <div className="mw7 center">
        <div className="mw6 ph3 mb3">
          <h3 className="f3 b lh-title mb2">{entry.getIn(["data", "videos", "videosHeading"])}</h3>
          <p>{entry.getIn(["data", "videos", "videosDescription"])}</p>
        </div>
      </div>

      <div className="mw7 center ph3 pv4">

        <div className="flex flex-wrap mhn1">
          <div className="w-100 w-50-ns pv1 pv0-ns ph1-ns">
            <div className="aspect-ratio aspect-ratio--16x9">
              <iframe className="aspect-ratio--object bg-grey-2 br1" src={entry.getIn(["data", "videos", "video1"])} frameBorder="0" allow="encrypted-media" allowFullScreen></iframe>
            </div>
          </div>
          <div className="w-100 w-50-ns pv1 pv0-ns ph1-ns">
            <div className="aspect-ratio aspect-ratio--16x9">
              <iframe className="aspect-ratio--object bg-grey-2 br1" src={entry.getIn(["data", "videos", "video2"])} frameBorder="0" allow="encrypted-media" allowFullScreen></iframe>
            </div>
          </div>
        </div>
      </div>


      <div className="tc mb4">
        <a href="/donate" className="btn raise">Donate now</a>
      </div>

    </div>;
  }
}
