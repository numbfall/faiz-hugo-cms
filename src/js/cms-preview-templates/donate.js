import React from "react";
import Jumbotron from "./components/jumbotron";

const ContactEntry = ({heading, phone, email}) =>
  <div>
    <h4 className="f4 b lh-title mb2 primary">{ heading }</h4>
    <p>{ phone }<br/>{ email }</p>
  </div>;

const ContactEntries = ({data}) => data && data.length > 0
  ? <div className="flex-ns justify-between mb3">
    {data.map(({heading, phone, email}, i) => <ContactEntry key={i} heading={heading} phone={phone} email={email} />)}
  </div>
  : "";

  export default class ContactPreview extends React.Component {
    render() {
      const {entry, getAsset} = this.props;
      const entryContactEntries = entry.getIn(["data", "contact_entries"]);
      const contactEntries = entryContactEntries ? entryContactEntries.toJS() : [];
      let image = getAsset(entry.getIn(["data", "image"]));

      // Bit of a nasty hack to make relative paths work as expected as a background image here
      if (image && !image.fileObj) {
        image = window.parent.location.protocol + "//" + window.parent.location.host + image;
      }
      
      return <div>
        <Jumbotron image={image} title={entry.getIn(["data", "title"])} />
        <div className="bg-off-white pv4 ph3">
        <div className="center">

          <h2 className="f2 b lh-title mb3">{entry.getIn(['data', 'accounts', 'heading'])}</h2>
          <p className="mw6">{entry.getIn(['data', 'accounts', 'description'])}</p>

          <div className="flex-ns mhn2-ns mw7">
            {(entry.getIn(['data', 'accounts', 'types']) || []).map((type, index) => <div className="w-50-ns ph2" key={index}>
              <div className="ph2">

                <h3 className="b f5 grey-3 tc lh-title mb3">{type.get('option')}</h3>

                <p className="primary f1 b tc lh-title center">
                  {type.get('price')}
                </p>

                 <p className="b">{type.get('description')}</p>

                <ul>
                  {(type.get('items') || []).map((item, index) => <li key={index}>
                    <p className={index + 1 !== type.get('items').size ? "pb2 mb2 divider-grey" : null}>
                    <span className="gray b">{item.get('label')}</span><br/>
                    <span>{item.get('text')}</span>
                    </p>
                  </li>)}
                </ul>

              </div>

            </div>)}
          </div>
        </div>
</div>
    <img src={getAsset(entry.getIn(["data", "full_image"]))} alt="" className="db w-100"/>
      <div className="ph3 bg-off-white">
        <div className="center mw6 pv3">
        <p className="mw6">{entry.getIn(['data', 'contact_description'])}</p>
          <ContactEntries data={contactEntries} />
        </div>
      </div>
      </div>;
    }
  }