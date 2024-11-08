import Int "mo:base/Int";
import Text "mo:base/Text";

import Array "mo:base/Array";
import Time "mo:base/Time";

actor {
    type Post = {
        title: Text;
        body: Text;
        author: Text;
        timestamp: Int;
    };

    stable var posts: [Post] = [];

    public func addPost(title: Text, body: Text, author: Text): async () {
        let newPost: Post = {
            title = title;
            body = body;
            author = author;
            timestamp = Time.now();
        };
        posts := Array.append(posts, [newPost]);
    };

    public query func getPosts(): async [Post] {
        return Array.sort<Post>(posts, func (a: Post, b: Post) {
            if (a.timestamp > b.timestamp) #less
            else if (a.timestamp < b.timestamp) #greater
            else #equal
        });
    };
}
